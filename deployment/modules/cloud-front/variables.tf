variable "origin-fqdn" {
  description = "The DNS domain name of either the S3 bucket, or web site of your custom origin."
  type        = string
}

variable "name" {
  description = "Name of the application that contains this environment version."
  type        = string
}

variable "environment" {
  description = "Custom name that represents this environment type. (Example: tst)"
  type        = string
}

variable "alias-cnames" {
  description = "Extra CNAMEs (alternate domain names), for this distribution."
  type        = list(string)
}
