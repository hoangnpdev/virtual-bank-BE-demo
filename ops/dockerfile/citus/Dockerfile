FROM ubuntu:20.04

RUN apt-get update
RUN apt-get install -y curl

RUN echo "tzdata tzdata/Areas select Asia" | debconf-set-selections

RUN echo "tzdata tzdata/Zones/Asia select Ho_Chi_Minh" | debconf-set-selections

RUN curl https://install.citusdata.com/community/deb.sh | /bin/bash

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y postgresql-17-citus-13.0

RUN pg_conftool 17 main set shared_preload_libraries citus
RUN pg_conftool 17 main set listen_addresses '*'

COPY pg_hba.conf /etc/postgresql/17/main/
USER postgres
CMD ["/usr/lib/postgresql/17/bin/postgres", "-D", "/etc/postgresql/17/main"]