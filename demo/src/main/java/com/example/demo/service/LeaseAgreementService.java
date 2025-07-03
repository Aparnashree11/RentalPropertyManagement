package com.example.demo.service;

import com.example.demo.model.LeaseAgreement;
import com.example.demo.repository.LeaseAgreementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LeaseAgreementService {

    @Autowired
    private LeaseAgreementRepository leaseAgreementRepository;

    public List<LeaseAgreement> getAllLeaseAgreements() {
        return leaseAgreementRepository.findAll();
    }

    public LeaseAgreement saveLeaseAgreement(LeaseAgreement leaseAgreement) {
        return leaseAgreementRepository.save(leaseAgreement);
    }

    public void deleteLeaseAgreement(Long id) {
        leaseAgreementRepository.deleteById(id);
    }
}
