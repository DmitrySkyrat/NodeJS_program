process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();

  if (chunk !== null) {
    const word = chunk.toString().split('').reverse().join('');
    process.stdout.write(`${word}\n`);
  }
});
