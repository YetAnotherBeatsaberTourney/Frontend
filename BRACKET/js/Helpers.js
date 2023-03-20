function FormatText(string) {
    let inputString = string;
    const firstSpaceIndex = inputString.indexOf(" ");
    const firstWord = inputString.substring(0, firstSpaceIndex);
    const remainingText = inputString.substring(firstSpaceIndex);
    const outputString = `${firstWord} <span style="font-weight:600;">${remainingText}</span>`;
    return outputString;
}