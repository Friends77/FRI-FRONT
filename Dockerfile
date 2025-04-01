# 공식 Nginx의 경량 버전(Alpine 기반) 이미지를 사용
FROM nginx:alpine

# 기본 설정 파일(default.conf)을 삭제
RUN rm /etc/nginx/conf.d/default.conf

# 커스텀 Nginx 설정 파일을 컨테이너 내 기본 설정 파일로 복사
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 정적 파일(dist 폴더)를 컨테이너 내 Nginx의 루트 디렉터리로 복사
COPY ./dist /usr/share/nginx/html

# 컨테이너에서 사용할 포트(80) 공개
EXPOSE 80

# Nginx를 foreground 모드(백그라운드 실행 X)로 실행
CMD ["nginx", "-g", "daemon off;"]