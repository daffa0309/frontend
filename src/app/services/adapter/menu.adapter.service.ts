import { Injectable } from '@angular/core';
import { Menu } from '../../models/Menu';
import { Adapter } from './adapter.service';


@Injectable({
  providedIn: 'root',
})
export class MenuAdapter implements Adapter<Menu> {
  public adapt(item: any): Menu {
    return {
        id: item.id,
        parentId: item.parentId,
        siteId: item.siteId,
        value: item.value,
        name: item.name,
        url: item.url,
        urlView: item.urlView,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    };
  }
}
