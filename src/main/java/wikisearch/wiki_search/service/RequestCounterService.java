package wikisearch.wiki_search.service;

import org.springframework.stereotype.Service;
import wikisearch.wiki_search.exception.ResourceNotFoundException;

@Service
public class RequestCounterService {
    private int count = 0;

    public synchronized void increment(int n) {
        count += n;
    }

    public synchronized void increment() {
        count++;
    }

    public synchronized void reset() {
        count = 0;
    }

    public synchronized int getCount() {
        if (count < 0) {
            throw new ResourceNotFoundException("Счетчик не может быть отрицательным");
        }
        return count;
    }
}
