# Run 단계 (Nginx 환경에서 빌드된 파일 실행)
FROM nginx:alpine

# GitHub Actions에서 빌드된 결과물(./dist)을 컨테이너에 복사
COPY ./dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
