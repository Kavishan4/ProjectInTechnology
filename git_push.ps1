
$Git = "C:\Program Files\Git\cmd\git.exe"

Write-Host "Initializing git..."
& $Git init

Write-Host "Configuring git user..."
& $Git config user.email "kavishan@example.com"
& $Git config user.name "Kavishan"

Write-Host "Adding remote..."
# Remove origin if it exists just in case
& $Git remote remove origin 2>$null
& $Git remote add origin "https://github.com/Kavishan4/ProjectInTechnology.git"

Write-Host "Fetching remote..."
& $Git fetch origin

Write-Host "Checking out main and syncing..."
& $Git branch -M main
# We pull changes, but prefer our local versions for any conflicts
& $Git reset --soft origin/main 2>$null

Write-Host "Adding files..."
& $Git add .

Write-Host "Committing..."
& $Git commit -m "Implement authentication and mentor registration"

Write-Host "Pushing to GitHub..."
& $Git push origin main --force

Write-Host "Done!"
