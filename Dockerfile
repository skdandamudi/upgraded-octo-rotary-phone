# ── DevOps Tooling ───────────────────────────────────────────────────────────
# Interactive tooling image bundling the day-to-day IaC / Kubernetes toolchain:
#   kubectl · terraform · helm · packer · aws cli v2 · python 3.12
#
# Every tool version is a build ARG. Leave an ARG empty to track latest/stable;
# set it to pin an exact version. Build context = repo root:
#   docker build -f docker/tooling/Dockerfile -t devops-tooling .
#   docker build -f docker/tooling/Dockerfile \
#       --build-arg TERRAFORM_VERSION=1.14.5 \
#       --build-arg KUBECTL_VERSION=v1.31.4 \
#       --build-arg HELM_VERSION=v3.16.3 \
#       --build-arg PACKER_VERSION=1.12.0 \
#       -t devops-tooling .

# ── Base image version (ARG before FROM is consumed by FROM only) ─────────────
ARG UBUNTU_VERSION=24.04
FROM ubuntu:${UBUNTU_VERSION}

SHELL ["/bin/bash", "-e", "-u", "-o", "pipefail", "-c"]

ENV DEBIAN_FRONTEND=noninteractive \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8

# ── Tool versions ─────────────────────────────────────────────────────────────
# Empty  => track latest / stable channel at build time.
# Pinned => exact version (kubectl/helm expect a leading "v", e.g. v1.31.4).
ARG PYTHON_VERSION=3.12
ARG TERRAFORM_VERSION=1.14.5
ARG PACKER_VERSION=
ARG KUBECTL_VERSION=
ARG HELM_VERSION=
ARG AWSCLI_VERSION=
ARG UV_VERSION=

# ── Base system packages ──────────────────────────────────────────────────────
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        unzip \
        git \
        jq \
        gnupg \
        software-properties-common \
        less \
        bash-completion \
    && rm -rf /var/lib/apt/lists/*

# ── Python + build/dev dependencies ───────────────────────────────────────────
# deadsnakes provides the interpreter + version-specific extras (Ubuntu 24.04
# ships 3.12 in-repo, but deadsnakes gives any 3.x). build-essential + the -dev
# system libraries let pip compile C-extension wheels (cryptography, psycopg,
# lxml, numpy from sdist, etc.).
RUN add-apt-repository -y ppa:deadsnakes/ppa \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        "python${PYTHON_VERSION}" \
        "python${PYTHON_VERSION}-venv" \
        "python${PYTHON_VERSION}-dev" \
        "python${PYTHON_VERSION}-tk" \
        "python${PYTHON_VERSION}-gdbm" \
        "python${PYTHON_VERSION}-lib2to3" \
        build-essential \
        pkg-config \
        libffi-dev \
        libssl-dev \
        zlib1g-dev \
        libbz2-dev \
        libreadline-dev \
        libsqlite3-dev \
        libncurses-dev \
        liblzma-dev \
        libgdbm-dev \
        libxml2-dev \
        libxmlsec1-dev \
        libkrb5-dev \
        uuid-dev \
        tk-dev \
    && rm -rf /var/lib/apt/lists/* \
    # System Python is PEP-668 "externally managed". This is a dedicated tooling
    # image, so drop the marker and let pip manage the interpreter directly.
    && rm -f "/usr/lib/python${PYTHON_VERSION}/EXTERNALLY-MANAGED" \
    # Make the chosen version the default python / python3 and bootstrap pip
    && update-alternatives --install /usr/bin/python3 python3 "/usr/bin/python${PYTHON_VERSION}" 1 \
    && update-alternatives --install /usr/bin/python  python  "/usr/bin/python${PYTHON_VERSION}" 1 \
    # ensurepip is disabled on Debian/Ubuntu, so bootstrap pip via get-pip.py
    # (works now that the EXTERNALLY-MANAGED marker is gone).
    && curl -fsSL https://bootstrap.pypa.io/get-pip.py -o /tmp/get-pip.py \
    && "python${PYTHON_VERSION}" /tmp/get-pip.py \
    && rm -f /tmp/get-pip.py \
    && "python${PYTHON_VERSION}" -m pip install --no-cache-dir --upgrade pip setuptools wheel \
    && python3 --version \
    && python3 -m pip --version

# ── uv (fast Python package / venv manager) ───────────────────────────────────
RUN if [[ -n "${UV_VERSION}" ]]; then UV_URL="https://astral.sh/uv/${UV_VERSION}/install.sh"; \
       else UV_URL="https://astral.sh/uv/install.sh"; fi \
    && curl -fsSL "${UV_URL}" -o /tmp/uv-install.sh \
    && UV_INSTALL_DIR=/usr/local/bin sh /tmp/uv-install.sh \
    && rm -f /tmp/uv-install.sh \
    && uv --version

# ── AWS CLI v2 ────────────────────────────────────────────────────────────────
RUN ARCH="$(uname -m)" \
    && if [[ -n "${AWSCLI_VERSION}" ]]; then SUFFIX="-${AWSCLI_VERSION}"; else SUFFIX=""; fi \
    && curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-${ARCH}${SUFFIX}.zip" -o /tmp/awscli.zip \
    && unzip -q /tmp/awscli.zip -d /tmp \
    && /tmp/aws/install \
    && rm -rf /tmp/aws /tmp/awscli.zip \
    && aws --version

# ── kubectl ───────────────────────────────────────────────────────────────────
RUN ARCH="$(dpkg --print-architecture)" \
    && VERSION="${KUBECTL_VERSION:-$(curl -fsSL https://dl.k8s.io/release/stable.txt)}" \
    && curl -fsSL "https://dl.k8s.io/release/${VERSION}/bin/linux/${ARCH}/kubectl" \
        -o /usr/local/bin/kubectl \
    && chmod +x /usr/local/bin/kubectl \
    && kubectl version --client

# ── Terraform ─────────────────────────────────────────────────────────────────
RUN ARCH="$(dpkg --print-architecture)" \
    && VERSION="${TERRAFORM_VERSION:-$(curl -fsSL https://api.releases.hashicorp.com/v1/releases/terraform/latest | jq -r '.version')}" \
    && curl -fsSL "https://releases.hashicorp.com/terraform/${VERSION}/terraform_${VERSION}_linux_${ARCH}.zip" \
        -o /tmp/terraform.zip \
    && unzip -o -q /tmp/terraform.zip terraform -d /usr/local/bin \
    && rm -f /tmp/terraform.zip \
    && terraform version

# ── Packer ────────────────────────────────────────────────────────────────────
RUN ARCH="$(dpkg --print-architecture)" \
    && VERSION="${PACKER_VERSION:-$(curl -fsSL https://api.releases.hashicorp.com/v1/releases/packer/latest | jq -r '.version')}" \
    && curl -fsSL "https://releases.hashicorp.com/packer/${VERSION}/packer_${VERSION}_linux_${ARCH}.zip" \
        -o /tmp/packer.zip \
    && unzip -o -q /tmp/packer.zip packer -d /usr/local/bin \
    && rm -f /tmp/packer.zip \
    && packer version

# ── Helm v3 ───────────────────────────────────────────────────────────────────
# get-helm-3 installs latest by default; DESIRED_VERSION pins it (e.g. v3.16.3).
RUN curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 -o /tmp/get-helm-3 \
    && chmod +x /tmp/get-helm-3 \
    && DESIRED_VERSION="${HELM_VERSION}" /tmp/get-helm-3 \
    && rm -f /tmp/get-helm-3 \
    && helm version

# ── Application user ──────────────────────────────────────────────────────────
# Non-root "app" user that owns /workspace so it can edit bind-mounted files.
# To edit host files without permission errors, the UID/GID must match the host
# owner. Defaults to 1000 (typical single-user Linux host); override to match:
#   docker build --build-arg APP_UID="$(id -u)" --build-arg APP_GID="$(id -g)" ...
ARG APP_USER=app
ARG APP_UID=1000
ARG APP_GID=1000

# Ubuntu 24.04 ships a default "ubuntu" user at UID/GID 1000, so free the
# requested IDs first, then create the app user to own them.
RUN if getent passwd "${APP_UID}" >/dev/null; then \
        userdel -r "$(getent passwd "${APP_UID}" | cut -d: -f1)" 2>/dev/null || true; \
    fi \
    && if getent group "${APP_GID}" >/dev/null; then \
        groupdel "$(getent group "${APP_GID}" | cut -d: -f1)" 2>/dev/null || true; \
    fi \
    && groupadd -g "${APP_GID}" "${APP_USER}" \
    && useradd -c "Application user" -d /home/"${APP_USER}" -u "${APP_UID}" -g "${APP_GID}" -m -s /bin/bash "${APP_USER}" \
    && mkdir -p /workspace \
                /home/"${APP_USER}"/.aws \
                /home/"${APP_USER}"/.kube \
                /home/"${APP_USER}"/.config \
    && chown -R "${APP_USER}:${APP_USER}" /workspace /home/"${APP_USER}" \
    && chmod -R u+rwX,g+rwX /workspace

# ── Runtime ───────────────────────────────────────────────────────────────────
USER ${APP_USER}
WORKDIR /workspace

# Mountable working directory. Bind-mount your project here, or let Docker manage
# a named/anonymous volume. The app user owns it, so mounted files are editable
# when APP_UID matches the host owner:
#   docker run -v "$PWD:/workspace" ...          # bind mount
#   docker run -v tooling-work:/workspace ...     # named volume
VOLUME ["/workspace"]

ENTRYPOINT ["/bin/bash"]
