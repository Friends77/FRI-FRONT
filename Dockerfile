# Run 단계 (Nginx 환경에서 빌드된 파일 실행)
FROM nginx:alpine

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/nginx.conf

# GitHub Actions에서 빌드된 결과물(./dist)을 컨테이너에 복사
COPY ./dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
