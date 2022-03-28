#!/usr/bin/python3
"""
deploy web_static
"""

from __future__ import with_statement
from fabric.api import local, run, put, env, settings
from os import path


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
    