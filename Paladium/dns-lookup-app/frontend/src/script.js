const form = document.getElementById('domain-form');
const domainInput = document.getElementById('domain-input');
const outputContainer = document.getElementById('output-container');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const domains = domainInput.value.split(',').map(domain => domain.trim());
    
    try {
        const response = await fetch('/api/dns-lookup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ domains }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displayOutput(data);
    } catch (error) {
        outputContainer.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
    }
});

function displayOutput(data) {
    outputContainer.innerHTML = '';
    data.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'border p-4 my-2 rounded';
        resultElement.innerHTML = `<h3 class="font-bold">${result.domain}</h3><pre>${result.output}</pre>`;
        outputContainer.appendChild(resultElement);
    });
}