# 🛒 ShopFlow — Amazon-style E-Commerce DevOps Platform

> Full-stack e-commerce app (React + Node.js + MongoDB) deployed with complete DevOps pipeline on AWS EKS

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React Router, Axios |
| **Backend** | Node.js, Express, JWT Auth |
| **Database** | MongoDB (StatefulSet on K8s) |
| **Container** | Docker (multi-stage builds) |
| **Orchestration** | Kubernetes (AWS EKS) |
| **CI/CD** | Jenkins + GitHub Actions |
| **GitOps** | ArgoCD + Helm |
| **Security** | Trivy + OWASP + SonarQube |
| **IaC** | Terraform (VPC + EKS + ECR) |
| **Config Mgmt** | Ansible (Jenkins server setup) |
| **Monitoring** | Prometheus + Grafana + Alertmanager |
| **Cloud** | AWS (EKS, ECR, S3, DynamoDB) |

---

## 📁 Project Structure

```
shopflow/
├── frontend/              # React app + Nginx
│   ├── src/
│   │   ├── components/    # Navbar, ProductCard, CartDrawer
│   │   ├── pages/         # Home, Product, Login, Orders
│   │   ├── context/       # CartContext, AuthContext
│   │   └── api/           # Axios instance
│   ├── Dockerfile         # Multi-stage build
│   └── nginx.conf
├── backend/               # Node.js REST API
│   ├── models/            # Product, User, Order (Mongoose)
│   ├── routes/            # Product, User, Order routes
│   ├── middleware/        # JWT auth middleware
│   ├── config/seed.js     # Database seeder
│   └── Dockerfile
├── k8s/                   # Raw Kubernetes YAMLs
├── helm/shopflow/         # Helm chart (ArgoCD uses this)
├── terraform/             # AWS EKS + VPC + ECR + S3
├── ansible/               # Jenkins server setup
├── jenkins/Jenkinsfile    # 9-stage CI/CD pipeline
├── monitoring/            # Prometheus alert rules
├── argocd/                # ArgoCD app manifest
├── .github/workflows/     # GitHub Actions (alternative CI)
└── docker-compose.yml     # Local development
```

---

## 🚀 Quick Start — Local (Docker Compose)

```bash
# 1. Clone repo
git clone https://github.com/dilnawaj9128/shopflow-devops
cd shopflow-devops

# 2. Start all services (MongoDB + Backend + Frontend)
docker compose up --build

# 3. Seed database with sample products
docker compose exec backend node config/seed.js
# OR it runs automatically via the 'seed' service

# 4. Open app
open http://localhost:3000

# Demo credentials:
# User:  dilnawaj@shopflow.in / demo123
# Admin: admin@shopflow.in   / admin123
```

---

## ☁️ Production Deployment (AWS EKS)

### Step 1: Provision Infrastructure (Terraform)
```bash
cd terraform
terraform init
terraform plan -out=plan.tfplan
terraform apply plan.tfplan
```

### Step 2: Setup Jenkins Server (Ansible)
```bash
cd ansible
# Edit inventory.ini with your EC2 IP
ansible-playbook -i inventory.ini site.yml
```

### Step 3: Install ArgoCD on EKS
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl apply -f argocd/application.yaml
```

### Step 4: Install Monitoring Stack
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack \
  -n monitoring --create-namespace
kubectl apply -f monitoring/alerts.yaml
```

### Step 5: Configure Jenkins
1. Open Jenkins at `http://YOUR_EC2_IP:8080`
2. Add credentials: `dockerhub-username`, `dockerhub-password`, `sonarqube-token`, `argocd-token`
3. Create pipeline → point to `jenkins/Jenkinsfile`
4. Every `git push` triggers the pipeline automatically!

---

## 🔄 CI/CD Pipeline (9 Stages)

```
git push → Jenkins webhook
    ↓
1. Checkout Code
2. SonarQube Analysis + Quality Gate
3. Build Docker Images (backend + frontend) — parallel
4. Trivy Security Scan (blocks on HIGH/CRITICAL CVEs)
5. OWASP Dependency Check
6. Push to Docker Hub / AWS ECR
7. Update Helm values.yaml (new image tag)
8. ArgoCD auto-syncs to EKS
9. Smoke Tests (health checks)
```

---

## 🌐 API Endpoints

| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/api/products` | List products (filter/search) | No |
| GET | `/api/products/:id` | Single product | No |
| POST | `/api/products` | Create product | Admin |
| POST | `/api/users/register` | Register | No |
| POST | `/api/users/login` | Login → JWT | No |
| GET | `/api/users/me` | Profile | JWT |
| POST | `/api/orders` | Place order | JWT |
| GET | `/api/orders/myorders` | My orders | JWT |
| GET | `/health` | Health check | No |

---

## 📊 Features

- **Amazon-style UI** — product grid, search, category filter, banners
- **JWT Auth** — register/login with protected routes
- **Shopping Cart** — add/remove/qty update, persistent in session
- **Order Management** — place orders, view history with status
- **Product Reviews** — star ratings (authenticated users)
- **Admin Panel** — manage products and orders via API
- **Security** — helmet, rate limiting, non-root Docker containers
- **Monitoring** — Prometheus metrics, Grafana dashboards, Alertmanager

---

## 👨‍💻 Author

**Md Dilnawaj** | B.Tech CSE, MDU Rohtak (2027)

- 🔗 GitHub: [github.com/dilnawaz9128](https://github.com/dilnawaz9128)
- 🔗 LinkedIn: [linkedin.com/in/md-dilnawaj-332370301](https://linkedin.com/in/md-dilnawaj-332370301)

---

*"Built to showcase end-to-end DevOps skills: Docker → Kubernetes → Jenkins → ArgoCD → Terraform → Ansible → Prometheus"*
