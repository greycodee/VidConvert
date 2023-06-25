
function parseM3u8File(m3u8StringData) {
    const lines = m3u8StringData.split('\n');
    let tsCount = -1;
    const updatedLines = lines.map((line) => {
        if (line.startsWith('#')) {
            if (line.startsWith('#EXTINF')){
                tsCount ++;
                return line+"\n"+`input${tsCount}.ts`;
            }else if (line.startsWith('#EXT-X-KEY')){
                const keys = line.split(',');
                const updateKeyLine = keys.map((key) => {
                    if (key.startsWith('URI')){
                        return `URI="key"`;
                    }
                    return key;
                });
                return updateKeyLine;
            }
            return line;
        }
    });
    return updatedLines.join('\n');
}

export {parseM3u8File}