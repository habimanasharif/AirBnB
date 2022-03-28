#!/usr/bin/python3
"""
remove old archives from deployment
"""


from __future__ import with_statement
from fabric.api import local, run, put, env, settings, sudo
from os import path
from datetime import datetime


env.user = 'ubuntu'
env.hosts = ['34.148.87.245', '3.231.218.82']


def do_deploy(archive_path):
    """function to use fabric to deploy a directory"""

    if archive_path == '':
        return False
    if not path.exists(archive_path):
        return False
    arc_file = archive_path.split('/')
    arc_file = arc_file[len(arc_file) - 1]
    folder_name = (arc_file.split('.'))[0]
    unzip_path = '/data/web_static/releases/{}'.format(folder_name)
    put(archive_path, '/tmp/')
    run('sudo mkdir -p {}'.format(unzip_path))
    run('sudo tar -zxf /tmp/{} -C {}'.format(arc_file, unzip_path))
    run('sudo mv {}/web_static/* {}'.format(unzip_path, unzip_path))
    run('sudo rm -rf {}/web_static'.format(unzip_path))
    run('sudo rm /tmp/{}'.format(arc_file))
    run('sudo rm -rf /data/web_static/current')
    run('sudo ln -s {} /data/web_static/current'.format(unzip_path))


def do_pack():
    """function to compress a directory"""

    local("mkdir -p versions")
    current_time = str(datetime.now())
    current_time = (current_time.split('.'))[0]
    current_time = current_time.replace(':', '')
    current_time = current_time.replace(' ', '')
    current_time = current_time.replace('-', '')
    file_path = 'versions/web_static_' + current_time + '.tgz'
    with settings(warn_only=True):
        result = local("tar -zcvf {} web_static".format(file_path))
    if result.failed:
        return None
    else:
        return file_path


def deploy():
    """fully compress folder and deploy"""

    compress = do_pack()
    if not compress:
        return False
    deploy = do_deploy(compress)
    return deploy


def do_clean(number=0):
    """function to delete archives"""

    number = int(number)
    if number == 0:
        number += 1
    num = str(number)
    path = '/data/web_static/releases'
    sudo('realpath {}/* | head -n -{} | xargs rm -rf --'.format(path, num))
    local('realpath versions/* | head -n -{} | xargs rm -rf --'.format(num))
