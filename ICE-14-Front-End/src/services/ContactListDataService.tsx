import http from '../http-common';
import IContactData from '../models/Contact';
class ContactListDataService
{
    create(data: IContactData)
    {
        return http.post<IContactData>("/add", data);
    }

    readAll()
    {
        return http.get<Array<IContactData>>("/contact-list");
    }

    readOne(id: any)
    {
        return http.get<IContactData>(`/edit/${id}`);
    }

    update(data: IContactData, id: any)
    {
        return http.post<IContactData>(`/edit/${id}`, data);
    }

    delete(id: any)
    {
        return http.get<IContactData>(`/delete/${id}`);
    }
}

export default new ContactListDataService();