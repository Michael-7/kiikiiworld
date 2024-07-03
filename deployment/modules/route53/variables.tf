variable "name" {
  description = "The base name of the dsn record."
  type        = string
}

variable "alias-target" {
  description = "The fqdn name of the dns target."
  type        = string
}

variable "zone" {
  description = "The Hosted Zone name of the desired Hosted Zone."
  type        = string
}
