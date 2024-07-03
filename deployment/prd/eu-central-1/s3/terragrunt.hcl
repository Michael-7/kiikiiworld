locals {
  env_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))

  env = local.env_vars.locals.env
}

terraform {
  source = "${path_relative_from_include()}/../modules/s3"
}

include "root" {
  path = find_in_parent_folders()
}

inputs = {
  environment = local.env,
  name = "kiikiiworld-bucket-1"
  source-files = "${get_repo_root()}/frontend/out"
}
