locals {
  env_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))

  env = local.env_vars.locals.env
}

terraform {
  source = "${path_relative_from_include()}/../modules/cloud-front"
}

include "root" {
  path = find_in_parent_folders()
}

dependency "bucket_frontend" {
  config_path = "../s3"

  mock_outputs = {
    fqdn = "mock-fqdn",
    id = "mock-id",
    arn = "mock-arn"
  }
}

inputs = {
  environment = local.env,
  name = "kiikiiworld",
  origin-fqdn = dependency.bucket_frontend.outputs.fqdn,
  alias-cnames = []
}
