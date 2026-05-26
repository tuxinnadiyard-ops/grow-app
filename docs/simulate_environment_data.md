Pour simuler un snapshot des données environementales :

```
while ($true) {
  Invoke-RestMethod `
    -Method POST `
    -Uri "http://localhost:3000/api/environment/collect"

  Start-Sleep -Seconds 60
}
```