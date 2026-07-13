output "s3_bucket_name" {
  description = "Terraform state S3 bucket"
  value       = aws_s3_bucket.state.id
}

output "dynamodb_table" {
  description = "Terraform state lock table"
  value       = aws_dynamodb_table.lock.name
}

output "ecr_backend_url" {
  description = "ECR Backend repository URL"
  value       = aws_ecr_repository.backend.repository_url
}

output "ecr_frontend_url" {
  description = "ECR Frontend repository URL"
  value       = aws_ecr_repository.frontend.repository_url
}

output "iam_role_name" {
  description = "IAM Role for EC2"
  value       = aws_iam_role.ec2_role.name
}
