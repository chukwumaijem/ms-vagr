FROM aerokube/selenoid:1.10.7

EXPOSE 8080

ENTRYPOINT /usr/bin/selenoid -listen :4444 \
  -conf /etc/selenoid/browsers.json \
  -container-network ms-vagr_default -limit ${MAX_SESSIONS} \
  -cpu ${CPU} -mem ${MEMORY} -timeout ${TIMEOUT}
