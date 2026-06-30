variable "aws_region"   { default = "ap-south-1" }
variable "project_name" { default = "shopflow" }
variable "tags" {
  default = {
    Project   = "shopflow"
    ManagedBy = "terraform"
    Owner     = "dilnawaj"
  }
}
