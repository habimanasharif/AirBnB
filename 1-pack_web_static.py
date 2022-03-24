#!/usr/bin/python3
'''Module 1-web_pack_static
Packs the static web page folder web_static into a .tgz file
'''
from fabric.api import *
from datetime import datetime
import os


def do_pack():
    '''Compresses directory web_static into .tgz format'''
    t = datetime.now()
    file_name = "web_static_" + str(t.year) + str(t.month) + str(t.day) +\
        str(t.hour) + str(t.minute) + str(t.second) + '.tgz'
    local('mkdir -p versions')
    local('tar -cvzf versions/{} web_static'.format(file_name))
    try:
        print('web_static packed: versions/' + file_name, "->",
              str(os.path.getsize(os.getcwd() + '/versions/'
                  + file_name)) + "Bytes")
    except Exception:
        return None
    return 'versions/' + file_name
