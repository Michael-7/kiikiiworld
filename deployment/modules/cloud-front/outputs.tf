output "fqdn" {
  description = "The fqdn corresponding to the distribution."
  value       = aws_cloudfront_distribution.s3-spa.domain_name
}
