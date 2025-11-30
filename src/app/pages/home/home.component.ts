import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  modalRef: any;
  searchParams!: FormGroup;

  packets = [
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
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: 'H. MIAMI MEDICAL CEN...', company: 'RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: 'XYZ Corp', company: 'ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: 'ABC Corp', company: 'XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
  ];


  xlspackets = [
    { sop: '25-000279439', case: '2025-181461-CC-25', plaintiff: '123 H. MIAMI MEDICAL CEN...', company: '123 RESPONSIVE AUTO INS...', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279440', case: '2025-181462-CC-25', plaintiff: '456 XYZ Corp', company: '123 ABC Company', received: '11/24/2025', served: '11/25/2025', selected: false },
    { sop: '25-000279441', case: '2025-181463-CC-25', plaintiff: '789ABC Corp', company: '123 XYZ Company', received: '11/24/2025', served: '11/25/2025', selected: false },
  ]

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  displayedPackets: any[] = [];
  filterDisplayedPackets: any[] = [];
  userInitials = 'VK';


  selectedFile: File | null = null;
  fileName: string = '';

  constructor(private fb: FormBuilder, private modalService: NgbModal) {
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
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedPackets = this.packets.slice(start, end);
    this.filterDisplayedPackets = [...this.displayedPackets];
  }

  getPages(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }



  filterTable() {
    const searchParams = this.searchParams.value;
    this.filterDisplayedPackets = this.displayedPackets.filter(item => {
      return Object.keys(searchParams).every(key => {
        if (!searchParams[key]) return true;
        return item[key]
          ?.toString()
          .toLowerCase()
          .includes(searchParams[key].toLowerCase());
      });
    });
  }

  clear() {
    this.searchParams.reset();
    this.filterDisplayedPackets = [...this.displayedPackets];
  }


  // Select All Toggle
  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.packets.forEach(p => p.selected = checked);
    this.updateDisplayedPackets();
  }


  downloadAsExcel() {

    // Convert JSON to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.displayedPackets);

    // Create workbook and add the worksheet
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Data': worksheet },
      SheetNames: ['Data']
    };

    // Generate Excel file buffer
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    // Save the file
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    saveAs(blob, 'data.xlsx');
  }


  onFileSelected(event: any, fileUploadModal: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
    }

    this.modalRef = this.modalService.open(fileUploadModal, { size: 'xl' })
  }

  upload() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Example POST request — replace with service
    console.log('Uploading...', this.fileName);

    // this.http.post('your-upload-url', formData).subscribe(...)
  }

  addRecrods() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedPackets = [...this.xlspackets, ...this.packets].slice(start, end);
    this.filterDisplayedPackets = [...this.displayedPackets];
    this.modalRef.close();
    window.scrollTo(0, 0);
  }

}
