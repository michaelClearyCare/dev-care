const file_system = require('fs');
const archiver = require('archiver');

const output = file_system.createWriteStream('target.zip');
const archive = archiver('zip');
const source_dir = '/dist'

output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err){
  throw err;
});

archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.directory(source_dir, false);

// append files from a sub-directory and naming it `new-subdir` within the archive
archive.directory('subdir/', 'new-subdir');

archive.finalize();
