# the following alpine image has glibc installed
FROM frolvlad/alpine-glibc

COPY ./build/exec /exec

RUN chmod +x /exec

EXPOSE ${PORT}

CMD ["./exec"]

