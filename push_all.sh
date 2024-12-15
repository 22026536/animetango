#!/bin/bash

# Push vào repository chính
echo "Pushing changes to the main repository..."
git push origin main || exit 1  # Nếu push chính thất bại, dừng script

# Danh sách các service con với các remote tương ứng
services=("backend/userService" "backend/animeService" "backend/userAnimeService" "backend/adminService" "backend/KNNService" "backend/DecisionTreeService" "backend/NaiveBayesService"  "backend/gateway" "frontend")

# Push vào từng service con
for service in "${services[@]}"; do
  echo "Pushing to $service..."

  # Kiểm tra xem thư mục của service có tồn tại hay không
  if [ -d "$service" ]; then
    cd $service

    # Pull các thay đổi từ remote để tránh xung đột
    git pull $service main || echo "Failed to pull from $service"

    # Push các thay đổi lên remote
    git push $service main || echo "Failed to push to $service"

    cd -  # Quay lại thư mục gốc
  else
    echo "Directory $service does not exist!"
  fi
done

echo "All services have been pushed (if no errors above)."
