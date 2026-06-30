output "eks_cluster_name"     { value = module.eks.cluster_name }
output "eks_cluster_endpoint" { value = module.eks.cluster_endpoint; sensitive = true }
output "ecr_urls" {
  value = { for k, v in aws_ecr_repository.shopflow : k => v.repository_url }
}
output "vpc_id" { value = module.vpc.vpc_id }
