data "archive_file" "logging_alerts" {
  type        = "zip"
  source_dir = "${path.module}/logging-alerts"
  output_path = "${path.module}/logging-alerts/index.js.zip"
}

resource "aws_lambda_function" "logging_alerts_lambda" {
  filename      = "${data.archive_file.logging_alerts.output_path}"
  function_name = "logging_alerts_${var.environment}"
  role          = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/lambda_role_${var.environment}"
  handler       = "index.handler"
  source_code_hash = "${data.archive_file.logging_alerts.output_base64sha256}"
  
  runtime = "nodejs12.x"

  environment {
    variables = {
      DYNAMO_TABLE = "efcms-${var.environment}"
    }
  }
}