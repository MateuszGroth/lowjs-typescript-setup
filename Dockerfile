FROM ubuntu

LABEL mateusz groth <mgroth@adva.com>

WORKDIR /app

RUN apt update 

# RUN apt install -y curl git make g++ automake autoconf libtool cmake python python3-pip nano
RUN apt install -y curl git make g++ automake autoconf libtool cmake python2 nano

# Fetch get-pip.py for python 2.7 
RUN curl https://bootstrap.pypa.io/pip/2.7/get-pip.py --output get-pip.py 

RUN python2 get-pip.py

RUN pip install pyyaml

RUN apt install -y python

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash

RUN apt install -y nodejs

RUN git clone --recurse-submodules https://github.com/neonious/lowjs

RUN cd lowjs

RUN make

EXPOSE 8080 9000

CMD ["/bin/bash"]