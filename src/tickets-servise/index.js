class ticketsServes {
  api_Base = 'https://aviasales-test-api.kata.academy/'
  getId = async () => {
    try {
      const params = new URL('search', this.api_Base)
      const res = await fetch(params)
      const result = await res.json()
      return result.searchId
    } catch (err) {
      throw new Error(err.message)
    }
  }
  id = this.getId()
  getTickets = async () => {
    try {
      const params = new URL('tickets', this.api_Base)
      params.searchParams.set('searchId', await this.id)
      const res = await fetch(params)
      if (res.status === 500) {
        throw new Error('500 Ошибка на сервере!')
      }
      return await res.json()
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export { ticketsServes }
