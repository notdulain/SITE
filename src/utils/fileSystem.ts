export const fsState = {
    currentDirectory: '~',
    fileSystem: {
        '~': [
            'Desktop',
            'Documents',
            'Downloads',
            'Pictures',
            'Quantum_Research',
            'Startup_Ideas',
            'Toastmasters_Speeches',
        ],
        '~/Desktop': ['setup.exe', 'cool_background.png'],
        '~/Documents': ['passwords.txt', 'todo.md'],
        '~/Downloads': ['ram_download.zip', 'malware.sh'],
        '~/Pictures': ['cat.jpg', 'dog.png'],
    } as Record<string, string[]>,
};
