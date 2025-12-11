import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  modalRef: any;
  searchParams!: FormGroup;
  manualRecord = {
    sop: '',
    case: '',
    plaintiff: '',
    company: '',
    received: '',
    served: '',
  };


  packets = [
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '12/8/2025', served: '12/9/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '12/10/2025', served: '12/11/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
  ];


  xlspackets = [
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: '123 H. MIAMI MEDICAL CEN...', company: '123 RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: '456 XYZ Corp', company: '123 ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: '789ABC Corp', company: '123 XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: '123 H. MIAMI MEDICAL CEN...', company: '123 RESPONSIVE AUTO INS...', received: '12/9/2025', served: '12/10/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: '456 XYZ Corp', company: '123 ABC Company', received: '12/10/2025', served: '12/11/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: '789ABC Corp', company: '123 XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false }
  ]

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  displayedPackets: any[] = [];
  filterDisplayedPackets: any[] = [];



  selectedFile: File | null = null;
  fileName: string = '';

  constructor(private fb: FormBuilder, private modalService: NgbModal, private router: Router) {
    this.searchParams = this.fb.group({
      sop: [''],
      case: [''],
      plaintiff: [''],
      company: [''],
      received: [''],
      served: [''],
    });
    this.totalPages = Math.ceil(this.packets.length / this.itemsPerPage);
    this.updateDisplayedPackets();
  }

  // Pagination Functions
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updateDisplayedPackets();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedPackets();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedPackets();
    }
  }

updateDisplayedPackets() {
  this.filterDisplayedPackets = this.filterLast4Days([...this.packets]);

  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;

  this.displayedPackets = this.filterDisplayedPackets.slice(start, end);
  this.totalPages = Math.ceil(this.filterDisplayedPackets.length / this.itemsPerPage);
}




  getPages(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }


filterTable() {
  const f = this.searchParams.value;

  // Always use packets already updated in ngOnInit
  let filtered = this.filterLast4Days([...this.packets]);

  filtered = filtered.filter(item => {
    return (
      (!f.case || item.case.toLowerCase().includes(f.case.toLowerCase())) &&
      (!f.plaintiff || item.plaintiff.toLowerCase().includes(f.plaintiff.toLowerCase())) &&
      (!f.company || item.company.toLowerCase().includes(f.company.toLowerCase())) &&
      (!f.received || new Date(item.received) >= new Date(f.received)) &&
      (!f.served || new Date(item.served) <= new Date(f.served))
    );
  });

  this.filterDisplayedPackets = filtered;
  this.currentPage = 1;
  this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);

  this.displayedPackets = filtered.slice(0, this.itemsPerPage);
}


updateDates(data: any[]) {
  const today = new Date();
 
  for (let i = 0; i < data.length; i++) {
    const dayOffset = Math.floor(i / 2); // groups of 2
 
    // received date = today - offset
    const receivedDate = new Date();
    receivedDate.setDate(today.getDate() - dayOffset);
 
    // served date = received + 1 day (still correct sequence)
    const servedDate = new Date(receivedDate);
    servedDate.setDate(receivedDate.getDate() + 1);
 
    const format = (d: Date) =>
      `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
 
    data[i].received = format(receivedDate);
    data[i].served = format(servedDate);
  }

 
  return data;
}



 
filterLast4Days(data: any[]) {
  const today = new Date();
  const fourDaysAgo = new Date(today);
  fourDaysAgo.setDate(today.getDate() - 4);

  return data.filter(d => {
    const served = new Date(d.served);
    return served >= fourDaysAgo && served <= today;
  });
}




 ngOnInit() {
  this.packets = this.updateDates([...this.packets]);  // only once!
  this.updateDisplayedPackets();
}






  clear() {
    this.searchParams.reset();
    this.filterDisplayedPackets = [...this.displayedPackets];
  }


  // Select All Toggle
  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.displayedPackets.forEach(p => p.selected = checked);
    this.updateDisplayedPackets();
  }


  downloadAsExcel() {


    // Add XLS records that were selected
    const selectedXlsRecords = this.displayedPackets.filter(x => x.selected);
    // Convert JSON to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedXlsRecords);

    const workbook: XLSX.WorkBook = {
      Sheets: { 'Data': worksheet },
      SheetNames: ['Data']
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    // Create date string (YYYY-MM-DD)
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    // Filename with date
    const fileName = `data_${formattedDate}.xlsx`;
    // const fileName = `data_last4days_${formattedDate}.xlsx`;

    saveAs(blob, fileName);
  }


  onFileSelected(event: any, fileUploadModal: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
    }

    this.modalRef = this.modalService.open(fileUploadModal, { size: 'xl', backdrop: 'static' })
  }

  upload() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Example POST request — replace with service
    console.log('Uploading...', this.fileName);

    // this.http.post('your-upload-url', formData).subscribe(...)
  }

  addRecords() {

    const recordsToInsert = [];

    // If user manually entered data, push it
    if (this.manualRecord.sop || this.manualRecord.case || this.manualRecord.plaintiff) {
      const newManualRecord = {
        ...this.manualRecord,
        selected: false
      };
      recordsToInsert.push(newManualRecord);

      // Clear manual form
      this.manualRecord = {
        sop: '',
        case: '',
        plaintiff: '',
        company: '',
        received: '',
        served: '',
      };
    }

    // Add XLS records that were selected
    const selectedXlsRecords = this.xlspackets.filter(x => x.selected);

    recordsToInsert.push(...selectedXlsRecords);

    // Insert at the top of main list
    this.packets.unshift(...recordsToInsert);

    // Recalculate pagination
    this.totalPages = Math.ceil(this.packets.length / this.itemsPerPage);
    this.updateDisplayedPackets();

    // Close modal
    this.modalRef.close();
    window.scrollTo(0, 0);
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}
