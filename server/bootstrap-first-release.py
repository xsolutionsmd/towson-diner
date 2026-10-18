#!/usr/bin/env python3
"""Adopt the verified direct release as rollback config, without inventing managed state."""
import fcntl
import json
import os
import shutil
import subprocess
import urllib.request
from pathlib import Path

assert os.geteuid() == 0, 'Run as root after the paused installer'
root = Path('/opt/towson-diner')
state = Path('/var/lib/towson-diner-deploy')
with (state/'update.lock').open('a') as lock:
    fcntl.flock(lock, fcntl.LOCK_EX)
    assert not (state/'transaction').exists(), 'Inspect pending recovery first'
    assert not (state/'current.json').exists(), 'Already managed; do not re-bootstrap'
    assert not (root/'release.env').exists(), 'Inspect existing release configuration'
    receipt = json.loads((root/'first-release.json').read_text())
    assert receipt['revision'] == '558c8e9d74a6b963e3419376754fc3e220f8e966'
    c = json.loads(subprocess.check_output(['docker','inspect',receipt['container']]))[0]
    assert c['Image'] == receipt['image_id'] and c['State']['Health']['Status'] == 'healthy'
    assert c['Config']['Labels']['com.docker.compose.project'] == 'towson-diner'
    assert c['Config']['Labels']['org.opencontainers.image.revision'] == receipt['revision']
    assert c['Config']['Labels']['org.opencontainers.image.source'] == 'https://github.com/xsolutionsmd/towson-diner'
    for name in ('compose.yaml','image.env'):
        assert not (root/name).is_symlink(), 'Refuse linked configuration'
    env = (root/'image.env').read_text()
    assert env.strip() in {'APP_IMAGE='+receipt['tag'], 'APP_IMAGE='+receipt['image_id']}, 'Unexpected first image configuration'
    image_ref=env.strip().removeprefix('APP_IMAGE=')
    image=json.loads(subprocess.check_output(['docker','image','inspect',image_ref]))[0]
    assert image['Id'] == receipt['image_id'], 'First-release reference resolves to another image'
    with urllib.request.urlopen('https://towsondiner.xsolutionsmd.com/version.json',timeout=20) as r:
        assert json.load(r)['revision'] == receipt['revision']
    backup = state/'first-release-bootstrap'
    backup.mkdir(mode=0o700)
    for name in ('compose.yaml','image.env','first-release.json'):
        shutil.copy2(root/name,backup/name)
    fd=os.open(root/'release.env',os.O_WRONLY|os.O_CREAT|os.O_EXCL,0o600)
    with os.fdopen(fd,'w') as f:
        f.write(env); f.flush(); os.fsync(f.fileno())
    print(json.dumps({'adopted_revision':receipt['revision'],'rollback_config':str(backup),
      'current_json_created':False,'container_preserved':c['Id']}))
