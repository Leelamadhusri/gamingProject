# Django Gaming Project - TODO List

## Plan Approval: ✅ Approved

## Tasks to Complete:

### 1. Fix games/urls.py - Add missing import for path
   - [ ] Add `from django.urls import path` import to games/urls.py

### 2. Fix main urls.py - Include games and users app URLs
   - [ ] Add include import
   - [ ] Add games app URLs
   - [ ] Add users app URLs (when created)

### 3. Create users app files
   - [ ] Create gaming_project/users/__init__.py
   - [ ] Create gaming_project/users/apps.py
   - [ ] Create gaming_project/users/views.py with login/logout/register views
   - [ ] Create gaming_project/users/urls.py

### 4. Move templates to proper location
   - [ ] Create gaming_project/templates/games/ directory
   - [ ] Move all HTML files from games/ to templates/games/
   - [ ] Update views.py to use correct template paths

### 5. Create base template
   - [ ] Create gaming_project/templates/base.html for consistent design

## Progress:
- Started: Waiting for user approval
- Status: In Progress
