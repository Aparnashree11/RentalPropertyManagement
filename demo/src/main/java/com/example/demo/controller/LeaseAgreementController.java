package com.example.demo.controller;

import com.example.demo.model.LeaseAgreement;
import com.example.demo.model.Property;
import com.example.demo.service.LeaseAgreementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/lease")
public class LeaseAgreementController {

    @Autowired
    private LeaseAgreementService leaseAgreementService;

    @GetMapping("/{name}")
    public List<LeaseAgreement> getLeaseAgreements(@PathVariable String name) {
        return leaseAgreementService.getAllLeaseAgreements(name);
    }

    @PostMapping
    public LeaseAgreement addLeaseAgreement(@RequestBody LeaseAgreement leaseAgreement) {
        return leaseAgreementService.saveLeaseAgreement(leaseAgreement);
    }

    @DeleteMapping("/{id}")
    public void deleteLeaseAgreement(@PathVariable Long id) {
        leaseAgreementService.deleteLeaseAgreement(id);
    }

    @PutMapping("/{id}")
    public void updateProperty(@PathVariable Long id, @RequestBody LeaseAgreement leaseAgreement) {
        leaseAgreementService.updateLeaseAgreement(id, leaseAgreement);
    }
}
