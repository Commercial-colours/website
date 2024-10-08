#!/bin/bash
# File:        exp_permissions.sh
# Description: Sets permssions on a ExpressionEngine 2 install
#
# Copyright 2010 George Ornbo (Shape Shed)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# Get the working directory
DIR=$(pwd)

# The default ExpressionEngine system folder
DEFAULT="system"

# The message shown if we can't find a file / folder
ERROR_MESSAGE="Not found so no action taken:"

# Has the user changed the system folder name?
printf "Enter your system folder name (default: system):\n" 
read SYSTEM_FOLDER

# If no value is entered set default
if [ "$SYSTEM_FOLDER" == "" ] 
then
    SYSTEM_FOLDER=$DEFAULT
fi

# Declare files and folders as arrays
FILES_666[0]=$DIR/$SYSTEM_FOLDER/expressionengine/config/config.php 
FILES_666[1]=$DIR/$SYSTEM_FOLDER/expressionengine/config/database.php 

DIRS_777[0]=$DIR/uploads/avatars/uploads/ 
DIRS_777[1]=$DIR/uploads/captchas/ 
DIRS_777[2]=$DIR/uploads/member_photos/ 
DIRS_777[3]=$DIR/uploads/pm_attachments/ 
DIRS_777[4]=$DIR/uploads/signature_attachments/ 
DIRS_777[5]=$DIR/uploads/ 
DIRS_777[6]=$DIR/$SYSTEM_FOLDER/expressionengine/cache/
DIRS_777[7]=$DIR/assets/templates/
DIRS_777[8]=$DIR/assets/images/
DIRS_777[9]=$DIR/assets/media/
DIRS_777[10]=$DIR/assets/cache/
DIRS_777[11]=$DIR/assets/audio/
DIRS_777[12]=$DIR/images/made/
DIRS_777[13]=$DIR/images/remote/

# Check files exist and change permissions
for FILE in ${FILES_666[@]}
do
    if [ -e $FILE ]
    then
        chmod 666 $FILE
    else
        printf "$ERROR_MESSAGE $FILE\n"
    fi
done

# Check directories exist and change permissions
for DIR in ${DIRS_777[@]}
do
    if [ -d $DIR ]
    then
        chmod -R 777 $DIR
    else
        printf "$ERROR_MESSAGE $DIR\n"
    fi
done
