locals {
  # Automatically load region-level variables
  region_vars = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  # Automatically load environment-level variables
  env_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))

  aws_region   = local.region_vars.locals.aws_region
}

remote_state {
  backend = "local"
  generate = {
    path = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }

  config = {
    path = "${path_relative_to_include()}/terraform.tfstate"
  }
}

generate "provider" {
  path = "provider.tf"
  if_exists = "overwrite_terragrunt"

  contents = <<EOF
    provider "aws" {
      region = "${local.aws_region}"
    }
  EOF
}

generate "versions" {
  path      = "versions_override.tf"
  if_exists = "overwrite_terragrunt"

  contents  = <<EOF
    terraform {
      required_providers {
        aws = {
          source  = "hashicorp/aws"
          version = "= 5.43.0"
        }
      }
    }
  EOF
}

generate "backend" {
  path      = "backend.tf"
  if_exists = "overwrite_terragrunt"
  contents = <<EOF
    terraform {
      backend "s3" {
        bucket         = "kiikiiworld-terraform-state"
        key            = "${path_relative_to_include()}/terraform.tfstate"
        region         = "eu-central-1"
        encrypt        = true
      }
    }
    EOF
}

inputs = merge(
  local.region_vars.locals,
  local.env_vars.locals,
)

