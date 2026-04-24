async function fetchData() 
{
    const data = await fetch('https://kitek.ktkv.dev/static/spotify.json')
    const json = await data.json()
    renderStats(json)
    renderTracks(json)
}

const container = document.querySelector('#tracksContainer')
const statsContainer = document.querySelector('#statsContainer')

function renderTracks(items) 
{
    const html = items
        .map((item) => `
        <li class="track-item">
            <div class="track-number"></div>
            <div class="track-main">
                <img src="${item.track.album.images[0].url}" alt="${item.track.name}" class="album-art" loading="lazy">
                <div class="track-info">
                    <div class="track-name">${item.track.name}</div>
                    <div class="track-artists">${item.track.artists.map((a) => a.name).join(', ')}</div>
                    <div class="track-album">${item.track.album.name}</div>
                </div>
            </div>
            <div class="track-meta">
                <div class="duration">${formatData(item.track.duration_ms)}</div>
                <div class="popularity">${item.track.popularity}</div>
            </div>
        </li>
        `)
        .join('')
    
    container.innerHTML = html
}

function renderStats(items) 
{
    const totalMs = items.reduce((sum, item) => sum + item.track.duration_ms, 0)
    
    statsContainer.innerHTML = `
        <div class="total-tracks">Треков: ${items.length}</div>
        <div class="total-duration">Общая длительность: ${formatTotal(totalMs)}</div>
    `
}

function formatData(timer) 
{
    const sec = Math.floor(timer / 1000)
    const min = Math.floor(sec / 60)
    const resSec = sec % 60
    return `${min}:${resSec < 10 ? '0' : ''}${resSec}`
}

function formatTotal(timer) 
{
    const sec = Math.floor(timer / 1000)
    const hours = Math.floor(sec / 3600)
    const min = Math.floor((sec % 3600) / 60)
    return `${hours} ч ${min} мин`
}

fetchData()
