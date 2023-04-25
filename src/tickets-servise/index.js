class ticketsServes {
  api_Base = 'https://aviasales-test-api.kata.academy/'
  getId = async () => {
    const params = new URL('search', this.api_Base)
    const res = await fetch(params)
    if (!res.ok) {
      console.log('id failed')
      throw new Error(`Ошибка ${res.status}, не переживайте, мы все исправим!`)
    }
    const result = await res.json()
    return result.searchId
  }

  getTickets = async (id) => {
    const params = new URL('tickets', this.api_Base)
    params.searchParams.set('searchId', id)
    const res = await fetch(params)
    if (!res.ok) {
      if (res.status === 500) {
        throw new Error(`Ошибка ${res.status}, не переживайте, мы все исправим!`)
      }
      throw new Error()
    }
    return await res.json()
  }
}

export { ticketsServes }
