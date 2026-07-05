<div align="center">

# 🛒 ShopFlow
### End-to-End DevOps CI/CD & GitOps Project

*Amazon-style e-commerce platform with complete DevOps lifecycle*

![AWS](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
![ArgoCD](https://img.shields.io/badge/ArgoCD-EF7B4D?style=for-the-badge&logo=argo&logoColor=white)
![SonarQube](https://img.shields.io/badge/SonarQube-4E9BCD?style=for-the-badge&logo=sonarqube&logoColor=white)
![Trivy](https://img.shields.io/badge/Trivy-1904DA?style=for-the-badge&logo=aquasecurity&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)
![Helm](https://img.shields.io/badge/Helm-0F1689?style=for-the-badge&logo=helm&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![Ansible](https://img.shields.io/badge/Ansible-EE0000?style=for-the-badge&logo=ansible&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

</div>

---

## 📌 Project Overview

ShopFlow is a full-stack e-commerce web application built with React, Node.js, and MongoDB — deployed on AWS EC2 using a complete DevOps pipeline including CI/CD, GitOps, container orchestration, and real-time monitoring.

The project demonstrates automated CI/CD, code quality analysis, container security scanning, GitOps-based Kubernetes deployment, ingress routing, and infrastructure monitoring.

---

## 🏗️ Architecture

```text
                         Developer
                             │
                             │ git push
                             ▼
                         GitHub
                             │
                             │ Webhook
                             ▼
                          Jenkins
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
      SonarQube          Docker Build       Trivy Scan
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
                             ▼
                         Docker Hub
                             │
                             ▼
                Update Kubernetes Manifests
                             │
                             ▼
                          GitHub
                             │
                             ▼
                          Argo CD
                             │
                         Auto Sync
                             │
                             ▼
                     Kubernetes (KIND)
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
    Frontend Pods       Backend Pods       MongoDB
          │
          ▼
    Kubernetes Service
          │
          ▼
    NGINX Ingress
          │
          ▼
       EC2 Nginx
          │
          ▼
        Internet
```

---

## 🛠️ Technologies Used

| Category | Technology |
|---|---|
| **Cloud Platform** | AWS EC2 |
| **Source Control** | Git & GitHub |
| **CI/CD** | Jenkins |
| **Code Quality** | SonarQube |
| **Security Scanning** | Trivy |
| **Containerization** | Docker (multi-stage builds) |
| **Container Registry** | Docker Hub |
| **Orchestration** | Kubernetes (KIND) |
| **GitOps** | Argo CD |
| **Package Manager** | Helm |
| **Ingress** | NGINX Ingress Controller |
| **Reverse Proxy** | Nginx |
| **Monitoring** | Prometheus + Grafana (via Helm) |
| **IaC** | Terraform |
| **Config Management** | Ansible |
| **Database** | MongoDB |
| **Frontend** | React.js |
| **Backend** | Node.js + Express |

---

## 🔄 CI/CD Pipeline — 9 Stages

```text
┌─────────────────────────────────────────────────────────────────┐
│                     JENKINS PIPELINE                            │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │Checkout  │→ │SonarQube │→ │ Quality  │→ │  Build   │       │
│  │          │  │Analysis  │  │  Gate    │  │ Backend  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                   │             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────▼─────┐       │
│  │  Smoke   │← │Update K8s│← │Push Docker│← │  Build   │       │
│  │  Test    │  │Manifests │  │   Hub    │  │Frontend  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│        ↑                                                        │
│  ┌─────┴────┐                                                   │
│  │  Trivy   │                                                   │
│  │  Scan    │                                                   │
│  └──────────┘                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Stage 1 — Checkout
Latest source code pull from GitHub repository.

### Stage 2 — SonarQube Analysis
Static code analysis — bugs, vulnerabilities, code smells, maintainability.

### Stage 3 — Quality Gate
Pipeline aborts if SonarQube Quality Gate fails (`abortPipeline: true`).

### Stage 4 — Build Backend
Docker multi-stage image build for Node.js backend.

### Stage 5 — Build Frontend
Docker multi-stage image build for React + Nginx frontend.

### Stage 6 — Trivy Security Scan
Container image vulnerability scanning — pipeline fails on **CRITICAL** CVEs.

### Stage 7 — Push to Docker Hub
Versioned images pushed:
```text
dilnawaz9128/shopflow-backend:85    ← build number tag
dilnawaz9128/shopflow-backend:latest

dilnawaz9128/shopflow-frontend:85
dilnawaz9128/shopflow-frontend:latest
```

### Stage 8 — Update Kubernetes Manifests
Jenkins auto-updates image tags in K8s manifests and pushes to GitHub:
```text
k8s/backend.yml  → image: dilnawaz9128/shopflow-backend:85
k8s/frontend.yml → image: dilnawaz9128/shopflow-frontend:85
```

### Stage 9 — Smoke Test
Verifies deployed application is accessible and responding correctly.

---

## 🔁 GitOps Workflow

```text
Jenkins
   │
   │ Build & Push (versioned tags)
   ▼
Docker Hub
   │
   ▼
Update K8s Manifest Image Tags
   │
   ▼
GitHub Repository
   │
   ▼
Argo CD (detects change)
   │
   │ Auto Sync
   ▼
Kubernetes Cluster
   │
   ▼
Rolling Deployment ✅
```

> **Jenkins** → Continuous Integration
> **Argo CD** → Continuous Deployment
>
> Jenkins does **not** directly deploy to Kubernetes.
> Argo CD handles all deployments via GitOps.

---

## ☸️ Kubernetes Architecture

```text
shopflow namespace
│
├── Frontend Deployment  (2 replicas)
│   ├── Frontend Pod 1
│   └── Frontend Pod 2
│
├── Backend Deployment   (2 replicas)
│   ├── Backend Pod 1
│   └── Backend Pod 2
│
├── MongoDB StatefulSet  (1 replica + PVC)
│   └── MongoDB Pod
│
├── Seed Job             (one-time DB seeding)
│
├── Secrets
│   ├── shopflow-secret      (app credentials)
│   └── dockerhub-secret     (image pull)
│
└── Services
    ├── frontend  (NodePort:3000)
    ├── backend   (ClusterIP:5000)
    └── mongodb   (Headless)
```

---

## 📊 Monitoring Stack (Helm)

Prometheus and Grafana installed via **Helm** using `kube-prometheus-stack`:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --set grafana.adminPassword=Admin2024
```

```text
Kubernetes Cluster
        │
        ▼
    Prometheus
    (metrics scraping)
        │
        ▼
      Grafana
    (visualization)
        │
        ▼
 Dashboards:
 ├── Kubernetes Cluster Overview  (ID: 7249)
 ├── Node Exporter Full           (ID: 1860)
 └── K8s Resource Dashboard
```

**Metrics Tracked:**
- CPU utilization per pod/node
- Memory consumption
- Network traffic (Rx/Tx)
- Disk I/O
- Pod health and restart count
- Namespace resource statistics

---

## 🌐 Traffic Flow

```text
Internet User
      │
      ▼
AWS EC2 Public IP
      │
      ▼
EC2 Nginx Reverse Proxy :80
      │
      ▼
NGINX Ingress Controller
      │
      ├──────────────────────┐
      ▼                      ▼
Frontend Service         Backend Service
    :3000                    :5000
      │                        │
      ▼                        ▼
Frontend Pods            Backend Pods
                                │
                                ▼
                            MongoDB
                             :27017
```

**Ingress Routing:**
```text
/       → Frontend Service :3000
/api    → Backend Service  :5000
```

---

## 🔌 Service Access

| Service | Port |
|---|---:|
| ShopFlow App | 80 / 9090 |
| Jenkins | 8080 |
| Argo CD | 8443 |
| Grafana | 3001 |
| SonarQube | 9000 |
| Backend API | 5000 |
| MongoDB | 27017 |

---

## ♻️ EC2 Auto-Restart Configuration

Services configured to start automatically after EC2 restart:

```text
✅ Docker
✅ Jenkins
✅ Nginx
✅ SonarQube              (restart: unless-stopped)
✅ KIND Control Plane     (restart: unless-stopped)
✅ KIND Worker            (restart: unless-stopped)
```

---

## 🏭 Infrastructure as Code — Terraform

```hcl
# AWS Resources:
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
cd terraform
terraform init
terraform plan
terraform apply
terraform destroy   # when done
```

---

## ⚙️ Server Automation — Ansible

```bash
# Ansible installs on EC2:
- Docker + Docker Compose
- Jenkins
- Trivy
- kubectl
- Helm
- ArgoCD CLI
```

```bash
cd ansible
ansible-playbook -i inventory.ini site.yml
```

---

## 📁 Project Structure

```text
shopping-app/
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Navbar, ProductCard, CartDrawer
│   │   ├── pages/          # Home, Product, Login, Orders
│   │   ├── context/        # CartContext, AuthContext
│   │   └── api/            # Axios instance
│   ├── Dockerfile
│   └── nginx.conf
│
├── backend/
│   ├── models/             # Product, User, Order
│   ├── routes/             # API routes
│   ├── middleware/         # JWT auth
│   ├── config/seed.js      # Database seeder
│   └── Dockerfile
│
├── k8s/
│   ├── namespace.yml
│   ├── secret.yml
│   ├── backend.yml
│   ├── frontend.yml
│   ├── mongodb.yml
│   ├── ingress.yml
│   └── seed-job.yml
│
├── ansible/
│   ├── site.yml
│   └── inventory.ini
│
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
│
├── argocd/
│   └── application.yaml
│
├── monitoring/
│   └── alerts.yaml
│
├── nginx/
│   ├── shopflow.conf
│   ├── argocd.conf
│   └── grafana.conf
│
├── cluster.yml             # KIND cluster config
├── Jenkinsfile             # 9-stage CI/CD pipeline
├── docker-compose.yml      # Local development
├── .env.example
└── README.md
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

## 🚀 Quick Start

### Local Development

```bash
git clone https://github.com/dilnawaj9128/shopping-app.git
cd shopping-app

cp .env.example .env
# Fill in your values + generate JWT:
# openssl rand -hex 64

docker compose up -d

# Demo credentials:
# User:  user@shopflow.in  / User2024
# Admin: admin@shopflow.in / Admin2024
```

### Kubernetes Deployment

```bash
kind create cluster --name shopping-cluster --config cluster.yml

kubectl apply -f k8s/namespace.yml
kubectl apply -f k8s/secret.yml
kubectl apply -f k8s/mongodb.yml
kubectl apply -f k8s/backend.yml
kubectl apply -f k8s/frontend.yml
kubectl apply -f k8s/seed-job.yml

kubectl get all -n shopflow
```

### Install Monitoring (Helm)

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace \
  --set grafana.adminPassword=YourPassword
```

---

## 🔐 Security Practices

- ✅ SonarQube static code analysis + Quality Gate
- ✅ Trivy container scanning (blocks CRITICAL CVEs)
- ✅ Jenkins Credentials Management
- ✅ Kubernetes Secrets (no hardcoded values)
- ✅ Docker imagePullSecrets
- ✅ Non-root Docker containers
- ✅ JWT authentication
- ✅ Rate limiting + Helmet.js headers
- ✅ GitHub PAT for manifest updates

---

## 🔮 Future Improvements

- Migrate KIND → Amazon EKS (Terraform)
- Migrate Docker Hub → Amazon ECR
- AWS Application Load Balancer
- HTTPS/TLS with AWS Certificate Manager
- AWS Secrets Manager
- Horizontal Pod Autoscaling (HPA)
- Centralized logging (ELK Stack)
- Jenkins distributed build agents

---

## 📈 Complete Workflow

```text
Developer pushes code
        ↓
GitHub Webhook triggers Jenkins
        ↓
SonarQube analyzes code quality
        ↓
Quality Gate validates requirements
        ↓
Docker images built (multi-stage)
        ↓
Trivy scans for vulnerabilities
        ↓
Images pushed to Docker Hub (versioned)
        ↓
Jenkins updates K8s manifests
        ↓
Updated manifests pushed to GitHub
        ↓
Argo CD detects changes
        ↓
Kubernetes rolling deployment
        ↓
Smoke test verifies application
        ↓
✅ Deployment completed successfully
```

---

<div align="center">

## 👨‍💻 Author

**Md Dilnawaj** | B.Tech CSE, MDU Rohtak (2027)

[![GitHub](https://img.shields.io/badge/GitHub-dilnawaj9128-181717?style=for-the-badge&logo=github)](https://github.com/dilnawaj9128)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-md--dilnawaj-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/md-dilnawaj-332370301)
[![DockerHub](https://img.shields.io/badge/DockerHub-dilnawaz9128-2496ED?style=for-the-badge&logo=docker)](https://hub.docker.com/u/dilnawaz9128)

---

### ⭐ If you found this project helpful, please star the repository!

*"Built to demonstrate end-to-end DevOps skills on a production-grade e-commerce platform."*

`AWS` `Docker` `Kubernetes` `Jenkins` `ArgoCD` `Helm` `Prometheus` `Grafana` `SonarQube` `Trivy` `Terraform` `Ansible` `Nginx` `MongoDB`

</div>
