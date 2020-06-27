import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { Order } from 'src/app/shared/models/order';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$;
  modalRef: BsModalRef;
  selectedOrder: Order;

  constructor(private toastr: ToastrService, private orderService: OrderService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.collectOrders();
  }

  collectOrders(){
    this.orders$ = this.orderService.getAdminOrders();
  }

  changeStatus(status: string, order: Order){
    this.orderService.changeStatus({status: status}, order._id).subscribe({
      next: (result) => {
        order.status = status;
      }
    })
  }

  showDetails(table, order: Order){
    this.selectedOrder = order;
    this.modalRef = this.modalService.show(table);
  }

  close(){
    this.modalRef.hide();
  }

}