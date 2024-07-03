resource "aws_cloudfront_origin_access_identity" "s3-spa" {
  comment = local.spa-origin-id
}

locals {
  spa-origin-id = "${var.origin-fqdn}"
}

resource "aws_cloudfront_distribution" "s3-spa" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = compact(var.alias-cnames)
  price_class         = "PriceClass_100"

  origin {
    domain_name = var.origin-fqdn
    origin_id   = local.spa-origin-id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.s3-spa.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.spa-origin-id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy     = "redirect-to-https"
    response_headers_policy_id = aws_cloudfront_response_headers_policy.spa-header-policy.id
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations = []
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    origin      = "terraform"
    entity      = var.name
    environment = var.environment
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "null_resource" "cloud-front" {
  depends_on = [aws_cloudfront_distribution.s3-spa]

  provisioner "local-exec" {
    command = "aws cloudfront create-invalidation --distribution-id ${aws_cloudfront_distribution.s3-spa.id} --paths '/*'"
  }

  triggers = {
    always_run = timestamp()
  }
}

resource "aws_cloudfront_response_headers_policy" "spa-header-policy" {
  name = "spa-header-policy-${var.name}"

  security_headers_config {
    content_security_policy {
      content_security_policy = "default-src *"
      override                = false
    }

    content_type_options {
      override = false
    }

    frame_options {
      frame_option = "DENY"
      override     = false
    }

    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = false
    }

    xss_protection {
      override   = false
      protection = false
    }
  }

  custom_headers_config {
    items {
      header   = "Cache-Control"
      override = true
      value    = "max-age=604800, immutable"
    }
  }
}
