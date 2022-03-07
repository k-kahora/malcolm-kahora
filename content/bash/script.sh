#!/bin/bash


flag=0      # no error
while read line; do
  if [[ $line = *err* ]]; then flag=1; fi
done < inputfile
if !((flag)); then echo "oh no"; fi
