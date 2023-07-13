# https://docs.microsoft.com/cli/azure/storage/cors?view=azure-cli-latest#az_storage_cors_add
az storage cors add --methods DELETE GET HEAD MERGE OPTIONS POST PUT \
    --origins "*" \
    --allowed-headers "*" \
    --exposed-headers "*" \
    --services b \
    --max-age 86400 \
    --timeout 86400 \
    --account-key YOUR-RESOURCE-PRIMARY-KEY \
    --account-name YOUR-RESOURCE-NAME \
    --subscription YOUR-SUBSCRIPTION-ID \
    --sas-token "YOUR-SAS-TOKEN"

    az storage container generate-sas \
    --account-name seaquestservices \
    --name uploaded \
    --permissions acdlrw \
    --expiry '2023-12-30T07:28:38Z' \
    --auth-mode login \
    --as-user