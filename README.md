# 🛒 ShopFlow — Amazon-style E-Commerce DevOps Platform

> Production-grade e-commerce platform with complete DevOps lifecycle on AWS EC2

![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=flat&logo=jenkins&logoColor=white)
![ArgoCD](https://img.shields.io/badge/ArgoCD-EF7B4D?style=flat&logo=argo&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=flat&logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=flat&logo=grafana&logoColor=white)
![SonarQube](https://img.shields.io/badge/SonarQube-4E9BCD?style=flat&logo=sonarqube&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=flat&logo=terraform&logoColor=white)
![Ansible](https://img.shields.io/badge/Ansible-EE0000?style=flat&logo=ansible&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-FF9900?style=flat&logo=amazonaws&logoColor=white)

---

## 📌 Project Overview

ShopFlow is a full-stack e-commerce web application built with React, Node.js, and MongoDB — deployed on AWS EC2 using a complete DevOps pipeline including CI/CD, GitOps, container orchestration, and real-time monitoring.

---

## 🏗️ Architecture

```
Developer → git push
      ↓
GitHub Webhook → Jenkins CI/CD Pipeline
      ↓
SonarQube → Build → Trivy Scan → Docker Hub Push
      ↓
ArgoCD detects new image → Auto-deploy to Kubernetes
      ↓
Prometheus + Grafana → Real-time Monitoring
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js + Nginx |
| **Backend** | Node.js + Express |
| **Database** | MongoDB |
| **Containerization** | Docker (multi-stage builds) |
| **Orchestration** | Kubernetes (KIND on AWS EC2) |
| **CI/CD** | Jenkins (9-stage pipeline) |
| **GitOps** | ArgoCD |
| **Code Quality** | SonarQube |
| **Security Scan** | Trivy |
| **Monitoring** | Prometheus + Grafana |
| **IaC** | Terraform (AWS EKS + VPC) |
| **Config Management** | Ansible |
| **Cloud** | AWS EC2 |

---

## 📁 Project Structure

```
shopping-app/
├── frontend/                  # React.js app + Nginx
│   ├── src/
│   │   ├── components/        # Navbar, ProductCard, CartDrawer
│   │   ├── pages/             # Home, Product, Login, Orders
│   │   ├── context/           # CartContext, AuthContext
│   │   └── api/               # Axios instance
│   ├── Dockerfile
│   └── nginx.conf
├── backend/                   # Node.js REST API
│   ├── models/                # Product, User, Order
│   ├── routes/                # API routes
│   ├── middleware/            # JWT auth
│   ├── config/seed.js         # Database seeder
│   └── Dockerfile
├── k8s/                       # Kubernetes manifests
│   ├── namespace.yml
│   ├── secret.yml
│   ├── mongodb.yml
│   ├── backend.yml
│   ├── frontend.yml
│   └── seed-job.yml
├── jenkins/                   # CI/CD pipeline
│   └── Jenkinsfile
├── argocd/                    # GitOps config
│   └── application.yaml
├── monitoring/                # Prometheus alerts
│   └── alerts.yaml
├── ansible/                   # Server automation
│   ├── site.yml               # Jenkins + Docker + Tools setup
│   └── inventory.ini
├── terraform/                 # AWS Infrastructure as Code
│   ├── main.tf                # EKS + VPC + ECR
│   ├── variables.tf
│   └── outputs.tf
├── cluster.yml                # KIND cluster config
├── docker-compose.yml         # Local development
└── .env.example               # Environment template
```

---

## 🔄 CI/CD Pipeline (Jenkins — 9 Stages)

```
1. Checkout          → GitHub se latest code lena
2. SonarQube         → Code quality analysis
3. Quality Gate      → Pass/fail check (abortPipeline)
4. Build Backend     → Docker multi-stage image build
5. Build Frontend    → Docker multi-stage image build
6. Trivy Scan        → CRITICAL vulnerability scan
7. Push Docker Hub   → Image registry push with build tag
8. ArgoCD Sync       → Kubernetes deploy trigger
9. Smoke Test        → Backend + Frontend health check
```

---

## ☸️ Kubernetes Resources

```
Namespace: shopflow
├── Deployment: backend     (2 replicas + readinessProbe)
├── Deployment: frontend    (2 replicas)
├── StatefulSet: mongodb    (1 replica + PVC)
├── Job: seed-job           (database seeding)
├── Secret: shopflow-secret (credentials)
├── Secret: dockerhub-secret (image pull)
└── Services:
    ├── backend  (ClusterIP:5000)
    ├── frontend (NodePort:3000)
    └── mongodb  (Headless)
```

---

## 📊 Monitoring Stack

```
Prometheus → scrapes K8s metrics
      ↓
Grafana Dashboards:
├── Kubernetes Cluster Overview (ID: 7249)
├── Node Exporter Full (ID: 1860)
└── K8s Dashboard (ID: admh545)

Metrics Tracked:
├── CPU Usage per pod/node
├── Memory consumption
├── Network traffic (Rx/Tx)
├── Disk I/O
└── Pod health status
```

---

## 🏭 Infrastructure as Code (Terraform)

```hcl
# AWS Resources provisioned:
├── VPC (10.0.0.0/16)
│   ├── 2 Public Subnets
│   ├── 2 Private Subnets
│   ├── Internet Gateway
│   └── NAT Gateway
├── EKS Cluster (v1.28)
│   └── Node Group: 2x t3.medium
└── ECR Repositories
    ├── shopflow-backend
    └── shopflow-frontend
```

```bash
# Deploy infrastructure
cd terraform
terraform init
terraform plan
terraform apply

# Destroy when done
terraform destroy
```

---

## ⚙️ Server Automation (Ansible)

```yaml
# Ansible installs on EC2:
- Docker + Docker Compose
- Jenkins
- Trivy (security scanner)
- kubectl
- Helm
- ArgoCD CLI
```

```bash
# Run playbook
cd ansible
ansible-playbook -i inventory.ini site.yml
```

---

## 🚀 Quick Start

### Local Development

```bash
# Clone repo
git clone https://github.com/dilnawaj9128/shopping-app.git
cd shopping-app

# Environment setup
cp .env.example .env
# Fill in your values in .env

# Generate JWT secret
openssl rand -hex 64

# Start all services
docker compose up -d

# Access app
open http://localhost:3000

# Demo credentials:
# User:  user@shopflow.in / User2024
# Admin: admin@shopflow.in / Admin2024
```

### Kubernetes Deployment

```bash
# Create KIND cluster
kind create cluster --name shopping-cluster --config cluster.yml

# Deploy all resources
kubectl apply -f k8s/namespace.yml
kubectl apply -f k8s/secret.yml
kubectl apply -f k8s/mongodb.yml
kubectl apply -f k8s/backend.yml
kubectl apply -f k8s/frontend.yml
kubectl apply -f k8s/seed-job.yml

# Check status
kubectl get all -n shopflow

# Access app
kubectl port-forward svc/frontend -n shopflow 9090:3000 --address 0.0.0.0 &
open http://YOUR_EC2_IP:9090
```

### Start All Services (One Command)

```bash
chmod +x start-all.sh
./start-all.sh

# Access:
# App:     http://YOUR_EC2_IP:9090
# ArgoCD:  https://YOUR_EC2_IP:8443
# Grafana: http://YOUR_EC2_IP:3001
# Jenkins: http://YOUR_EC2_IP:8080
```

---

## 🌐 API Endpoints

| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/health` | Health check | No |
| POST | `/api/users/register` | Register | No |
| POST | `/api/users/login` | Login → JWT | No |
| GET | `/api/users/me` | Profile | JWT |
| GET | `/api/products` | List products | No |
| GET | `/api/products/:id` | Single product | No |
| POST | `/api/orders` | Place order | JWT |
| GET | `/api/orders/myorders` | My orders | JWT |

---

## 🔐 Security Features

- ✅ Non-root Docker containers
- ✅ Trivy image vulnerability scanning (blocks CRITICAL CVEs)
- ✅ SonarQube code quality gates
- ✅ Kubernetes Secrets (no hardcoded values)
- ✅ Jenkins Credentials for secret injection
- ✅ JWT authentication (30-day expiry)
- ✅ Rate limiting on API (200 req/15min)
- ✅ Helmet.js security headers

---

## 🔁 GitOps Flow (ArgoCD)

```
GitHub repo change detected
        ↓
ArgoCD auto-sync triggered
        ↓
Kubernetes resources updated
        ↓
Self-healing: crashed pods auto-restart
        ↓
Prune: removed resources auto-deleted
```

---

## 👨‍💻 Author

**Md Dilnawaj** | B.Tech CSE, MDU Rohtak (2027)

- 🔗 GitHub: [github.com/dilnawaj9128](https://github.com/dilnawaj9128)
- 🔗 LinkedIn: [linkedin.com/in/md-dilnawaj-332370301](https://linkedin.com/in/md-dilnawaj-332370301)
- 🐳 Docker Hub: [hub.docker.com/u/dilnawaz9128](https://hub.docker.com/u/dilnawaz9128)

---

*"Built to demonstrate end-to-end DevOps skills: Docker → Kubernetes → Jenkins → ArgoCD → Prometheus + Grafana → Terraform → Ansible"*
