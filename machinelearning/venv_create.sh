sudo apt-get install python3.6-tk -y
python3 -m venv sanconnect_env --without-pip --system-site-packages
source sanconnect_env bin/activate
pip install -r requirements.txt