variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "shopflow"
}

variable "account_id" {
  description = "AWS Account ID (for unique S3 bucket name)"
  type        = string
  default     = "407539787865"
}

variable "tags" {
  description = "Common tags"
  type        = map(string)
  default = {
    Project     = "shopflow"
    Environment = "production"
    ManagedBy   = "terraform"
    Owner       = "dilnawaj"
  }
}
