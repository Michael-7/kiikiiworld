### WIP ###

# data "aws_route53_zone" "main" {
#   name = var.zone
# }

# resource "aws_route53_record" "alias" {
#   zone_id = data.aws_route53_zone.main.zone_id
#   name = join(
#     ".",
#     compact([var.name, data.aws_route53_zone.main.name]),
#   )
#   type = "CNAME"
#   ttl  = "5"

#   records = [var.alias-target]
# }
